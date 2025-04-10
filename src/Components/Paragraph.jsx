import React, { useEffect } from 'react'

const Paragraph = ({paragraphContent ,changeParagraphContent }) => {
    useEffect(()=>{
        // console.log(titleContent)
    }, [paragraphContent])
  return (
    <div className='paragraph' contentEditable onBlurCapture={changeParagraphContent}
    dangerouslySetInnerHTML={{__html:paragraphContent}}
     data-placeholder="Type your paragraph here..."
    >

    </div>
  )
}

export default Paragraph