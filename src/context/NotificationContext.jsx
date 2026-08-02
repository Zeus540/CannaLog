import { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotifications, selectIsLoggedIn } from '../features/index'
import { useSnackbar } from 'notistack';

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const [newNotification, setNewNotification] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchNotifications())
        .then((res) => {
          const hasUnread = res.payload?.some((n) => n.notification_read === 0)
          setNewNotification(!!hasUnread)
        })
        .catch(() => {})
    }
  }, [isLoggedIn])

  const incomingNotifacation = () => {
    setNewNotification(true)
  }

  return (
    <NotificationContext.Provider value={{ newNotification, incomingNotifacation }}>
      {children}
    </NotificationContext.Provider>
  )
}
