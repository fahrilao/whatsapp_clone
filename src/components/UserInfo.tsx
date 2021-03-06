import React, { FC } from 'react'

interface UserInfoProps {
  id: string
  onClickLogout: () => void
}

export const UserInfo: FC<UserInfoProps> = React.memo(({ id, onClickLogout }) => {
  return (
    <div className="user_info">
      My id's {id}
      <button onClick={onClickLogout} className="btn-logout">Logout</button>
    </div>
  )
})
