import React, { useEffect } from 'react'

const Title = ({titleContent ,changeTitleContent }) => {
    useEffect(()=>{
        // console.log(titleContent)
    }, [titleContent])
  return (
    <div className='title' contentEditable onBlurCapture={changeTitleContent}
    dangerouslySetInnerHTML={{__html:titleContent}}
     data-placeholder="Type your title here..."
    >

    </div>
  )
}

export default Title