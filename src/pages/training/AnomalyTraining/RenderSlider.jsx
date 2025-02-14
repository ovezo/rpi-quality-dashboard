import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Slider from "react-slick";


const RenderSlider = ({ images, title, color, imageSize, slidesPerRow }) => {
  const [activeDicom, setActiveDicom] = useState(null)

  const elementSize = 1240;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesPerRow || 5,
    slidesToScroll: slidesPerRow || 5
  };

  return (
    <div className="mt-1">
      <div className="flex items-center justify-between py-1">
        <span className='text-center mb-1 flex-item'>{title} ({(images || []).length})</span>
      </div>
      <div>
        <PhotoProvider maskOpacity={0.8}>
          <Slider {...settings}>
            {
              (images || []).map((e, i) => (
                e.extension === 'dcm'
                  ?
                  <div className='p-1' key={i} onClick={() => setActiveDicom(e.url)}>
                    <div className={`outline outline-offset-1 outline-2 outline-${color}-500`}>
                      <UncontrollableDwv src={e.url} />
                    </div>
                  </div>
                  :
                  <div className='p-1' key={i}>
                    <PhotoView
                      // src={googleUrl + e.frame_url}
                      width={elementSize}
                      height={480}
                      render={({ scale, attrs }) => {
                        const width = attrs.style.width;
                        const offset = (width - elementSize) / elementSize;
                        const childScale = scale === 1 ? scale + offset : 1 + offset;
                        return (
                          <div {...attrs}>
                            <div style={{ transform: `scale(${childScale})`, width: elementSize, transformOrigin: '10 10', textAlign: 'center' }}>
                              <p style={{ color: color, textAlign: "center", fontSize: 20 }}>
                                {title}
                              </p>
                              <div style={{ display: 'inline-block', border: `7px solid ${color}` }}>
                                {
                                  e.extension === 'tif' || e.extension === 'tiff'
                                    ?
                                    <TiffViewerGeo src={e.url} file={e.file} />
                                    :
                                    <img
                                      src={e.url}
                                    />
                                }
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    >
                      <div>
                        {
                          e.extension === 'tif' || e.extension === 'tiff'
                            ?
                            <TiffViewerGeo src={e.url} file={e.file} />
                            :
                            <img
                              src={e.url}
                              className={`outline outline-offset-1 outline-2 outline-${color}-500`}
                            />
                        }
                      </div>
                    </PhotoView>

                  </div>
              ))
            }
          </Slider>
        </PhotoProvider>
      </div>
      {
        activeDicom
          ?
          <MyDialog
            src={activeDicom}
            open={Boolean(activeDicom)}
            onClose={() => setActiveDicom(null)}
          />
          :
          null
      }

    </div>
  )
}


export default RenderSlider