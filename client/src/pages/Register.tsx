import { AppInfo } from '@/components/auth/AppInfo';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ModeToggle } from '@/components/navbar/ModeToggle';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Loading } from '@/components/Loading';

export const Register = () => {
  const { state, isLoading } = useAuth();

  // redirect if user exists
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  if (state.user) return <Navigate to="/" />;

  return (
    <section className="max-w-5xl min-h-screen md:p-4 mx-auto grid md:grid-cols-2 md:place-items-center">
      <div className="relative h-full">
        <img
          src="https://burst.shopifycdn.com/photos/blue-nature.jpg?width=1850&format=pjpg&exif=1&iptc=1"
          className="object-cover min-h-full aspect-video md:rounded-tl-md md:rounded-bl-md"
        />
        <div className="absolute top-0 right-0 p-3">
          <ModeToggle />
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <AppInfo />
        </div>
      </div>
      <RegisterForm />
    </section>
  );
};
