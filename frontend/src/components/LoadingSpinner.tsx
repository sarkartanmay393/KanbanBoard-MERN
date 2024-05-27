import { MoonLoader } from "react-spinners";

interface LoadingSpinnerProps {
  loading: boolean;
}
const LoadingSpinner = ({ loading }: LoadingSpinnerProps) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center ${
        loading ? "" : "hidden"
      }`}
    >
      <MoonLoader color="#FAA0A0	" loading={loading} size={150} />
    </div>
  );
};

export default LoadingSpinner;