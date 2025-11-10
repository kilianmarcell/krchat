import "./IconButton.css";

export function IconButton({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} class="IconButton">
      <span class="material-symbols-outlined">{icon}</span>
      {text}
    </button>
  );
}
