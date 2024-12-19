// components/projects/LoadingSpinner.tsx

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-black">
    <div
      className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-purple-400"
      role="status"
    />
  </div>
);
