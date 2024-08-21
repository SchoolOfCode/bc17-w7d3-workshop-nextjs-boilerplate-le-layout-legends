import {useState, useEffect, useReducer} from 'react'


export default function MessageBox({messageType, messageText}) {
  return (
    <div>
      {messageType} - {messageText}
    </div>
  )
}
