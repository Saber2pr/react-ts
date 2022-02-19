import 'normalize.css'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import { Title } from './app.style'

export const App = () => {
  useEffect(() => {
    console.log('test')
  }, [])
  return (
    <>
      <Title />
      <main>
        <Button icon={<DownloadOutlined />}>test</Button>
      </main>
      <footer>footer</footer>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
