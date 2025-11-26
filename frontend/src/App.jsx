import { useState } from 'react'
import './components/Header'
import Header from 'comps/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <Header></Header>
         <div className="content_wrap">
          <div className="content">
            <article>
            </article>
          </div>
        </div>

     
    </>
  )
}

export default App
