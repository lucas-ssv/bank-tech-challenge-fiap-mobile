import { useState } from 'react'
import {
  Image,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  Pressable,
} from './ui'

export function ModalImage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Pressable onPress={() => setIsOpen(true)}>
        <Image
          size="xs"
          className="rounded-md"
          source={{
            uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          }}
          alt="image"
        />
      </Pressable>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalBackdrop />
        <ModalContent className="p-0">
          <ModalBody
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
            className="m-0"
          >
            <Image
              height={500}
              className="h-[500px] w-full"
              source={{
                uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              }}
              alt="image"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
