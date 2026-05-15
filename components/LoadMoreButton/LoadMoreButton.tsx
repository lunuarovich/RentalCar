import Loader from "@/components/Loader/Loader";
import css from "./LoadMoreButton.module.css";

interface LoadMoreButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function LoadMoreButton({
  onClick,
  disabled = false,
  isLoading = false,
}: LoadMoreButtonProps) {
  return (
    <div className={css.wrap}>
      <button
        className={css.button}
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {isLoading ? <Loader /> : "Load more"}
      </button>
    </div>
  );
}
