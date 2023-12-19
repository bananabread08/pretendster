import { PostList } from '../posts/PostList';
import { IPost, IUser } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { getYourPosts } from '@/services/postService';
import { PostsSkeleton } from '../home/PostsSkeleton';
import { useOutletContext } from 'react-router-dom';
import { MessageSquareDashed } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

/**
 * TODO: props.data already includes user posts. Might not need to fetch again
 *
 */

export const ProfilePosts = () => {
  // const updatedPosts: IPost[] = data.posts.map((post) => {
  //   return {
  //     ...post,
  //     user: {
  //       username: data.username,
  //       profileImg: data.profileImg,
  //       id: data.id,
  //     },
  //   };
  // });
  const { state } = useAuth();
  const [data]: IUser[] = useOutletContext();
  const query = useQuery({
    queryKey: ['posts', { id: data.id }],
    queryFn: () => getYourPosts(data.id),
  });

  if (query.isLoading)
    return (
      <div className="col-span-6 md:px-6 py-2">
        <PostsSkeleton />
      </div>
    );
  if (!query.data) return <div>Invalid</div>;
  const updatedPosts: IPost[] = query.data.map((post) => {
    return {
      ...post,
      user: {
        username: data.username,
        profileImg: data.profileImg,
        id: data.id,
      },
    };
  });

  return (
    <>
      {data.posts.length === 0 ? (
        <div className="h-full flex items-center justify-center gap-2 text-lg font-bold text-primary">
          <MessageSquareDashed size={50} />
          <span className="font-bold">
            {state.user?.id === data.id
              ? 'You have not posted yet.'
              : `${data.username} has not posted yet.`}
          </span>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-muted-foreground">
            {data.username}'s Posts
          </h1>
          <div className="w-full mt-4 space-y-4">
            <PostList data={updatedPosts} />
          </div>
        </>
      )}
    </>
  );
};
