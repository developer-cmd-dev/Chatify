import React from 'react'
import {ListBoxWrapper} from './index'
import {Listbox, ListboxItem} from "@nextui-org/react";

function MessageOptions() {
   
  return (
    <div className="flex flex-col gap-4 bg-black text-white ">
      <ListBoxWrapper>
        <Listbox aria-label="Listbox Variants" color={'primary'} variant={'shadow'}>
          <ListboxItem key="new">New file</ListboxItem>
          <ListboxItem key="copy">Copy link</ListboxItem>
          <ListboxItem key="edit">Edit file</ListboxItem>
          <ListboxItem key="delete" className="text-danger" color="danger">
            Delete Message
          </ListboxItem>
        </Listbox>
      </ListBoxWrapper>
      
    </div>
  )
}

export default MessageOptions