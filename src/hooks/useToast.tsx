import { ToastError, ToastSuccess } from '@/components'
import { useToast as useGluestackToast } from '@/components/ui'

type ToastType = 'success' | 'error'

export function useToast() {
  const toast = useGluestackToast()

  return (type: ToastType, message: string, code?: string) => {
    toast.show({
      placement: 'top',
      duration: 3000,
      render: (props) =>
        type === 'error'
          ? ToastError({
              ...props,
              error: { code: code || 'Erro', message },
            })
          : ToastSuccess({
              ...props,
              message,
            }),
    })
  }
}
