import RenderSlider from "./RenderSlider";

const ImageRenderer = ({trainedImages, slidesPerRow}) => (
  <div className="flex flex-col col-span-full bg-white dark:bg-slate-800 rounded-smpb-10 my-5">
    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700  flex items-center">
      <h2 className="text-slate-800 dark:text-slate-100">
        Selected Images (
          {
            (trainedImages?.normal?.length||0) + (trainedImages?.abnormal?.length||0) +
            (trainedImages?.train?.length||0) + (trainedImages?.test?.length||0) + (trainedImages?.valid?.length||0)
          } 
          pcs - {trainedImages.total_size}MB 
        )
      </h2>
    </header>
    <div className='px-10'>
      {
        trainedImages.normal?.length
          ?
          <RenderSlider
            slidesPerRow={slidesPerRow}
            images={trainedImages.normal}
            title={"Normal items"}
            color='green' />
          :
          null
      }

      {
        trainedImages.abnormal?.length
          ?
          <RenderSlider
            slidesPerRow={slidesPerRow}
            images={trainedImages.abnormal}
            title={"Abnormal items"}
            color='red' />
          :
          null
      }
      
      {
        trainedImages.train?.length
          ?
          <RenderSlider
            slidesPerRow={slidesPerRow}
            images={trainedImages.train}
            title={"Train images"}
            color='none' />
          :
          null
      }
      
      {
        trainedImages.test?.length
          ?
          <RenderSlider
            slidesPerRow={slidesPerRow}
            images={trainedImages.test}
            title={"Test items"}
            color='none' />
          :
          null
      }
      
      {
        trainedImages.valid?.length
          ?
          <RenderSlider
            slidesPerRow={slidesPerRow}
            images={trainedImages.valid}
            title={"Valid items"}
            color='none' />
          :
          null
      }
      
    </div>
  </div>
)

export default ImageRenderer;