type IconProps = {
  name: keyof typeof iconPaths;
  className?: string;
  size?: number;
};

export const iconPaths = {
  shoppingCart: '/cart.svg',
  menu: '/menu.svg',
  user: '/user.svg',
  x: '/cross.svg'
} as const;

export function Icon({ name, className = "", size = 24 }: IconProps) {
  return (
    <img 
      src={iconPaths[name]} 
      alt={`${name} icon`}
      className={className}
      width={size}
      height={size}
    />
  );
}
