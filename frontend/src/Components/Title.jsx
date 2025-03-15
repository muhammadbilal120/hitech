

function Title({text1,text2}) {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p style={{color : "#821C31"}}>{text1} <span className='font-bold' style={{color : "#821C31"}} >{text2} </span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
        </div>
  )
}

export default Title