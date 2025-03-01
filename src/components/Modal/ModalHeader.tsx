import type { ComponentProps, ElementType, FC, PropsWithChildren } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';
import { useModalContext } from './ModalContext';

export interface FlowbiteModalHeaderTheme {
  base: string;
  popup: string;
  title: string;
  close: {
    base: string;
    icon: string;
  };
}

export interface ModalHeaderProps extends PropsWithChildren<ComponentProps<'div'>> {
  as?: ElementType;
  theme?: DeepPartial<FlowbiteModalHeaderTheme>;
}

export const ModalHeader: FC<ModalHeaderProps> = ({
  as: Component = 'h3',
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.modal.header, customTheme);
  const { popup, onClose } = useModalContext();

  return (
    <div className={twMerge(theme.base, popup && theme.popup, className)} {...props}>
      <Component className={theme.title}>{children}</Component>
      <button aria-label="Close" className={theme.close.base} type="button" onClick={onClose}>
        <HiOutlineX aria-hidden className={theme.close.icon} />
      </button>
    </div>
  );
};
