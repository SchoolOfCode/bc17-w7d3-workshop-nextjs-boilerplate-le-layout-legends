import {useState, useEffect, useReducer} from 'react'
import styles from './MessageBox.module.css'


export default function MessageBox({messageType, messageText}) {
  return (
    <div className= {styles.messageBox}>
      {messageType}  {messageText}
    </div>
  )
}
