import clsx from "clsx";

interface RatingBarProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export default function RatingBar({ rating, maxRating = 5, className }: RatingBarProps) {
  const percentage = (rating / maxRating) * 100;

  return (
    <div className={clsx("flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden", className)}>
      <div
        className="h-1.5 rounded-full bg-primary transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
