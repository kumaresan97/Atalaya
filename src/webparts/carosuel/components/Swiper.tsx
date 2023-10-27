import * as React from "react";
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import "./style.css"; // Import your custom CSS for styling

const Swiperfn = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const array = [
    {
      url: "https://igimages.gumlet.io/tamil/home/suriya-neet1962021m.jpg?w=376&dpr=2.6",
    },
    {
      url: "https://d1vzdswwroofzl.cloudfront.net/wp-content/uploads/2022/06/Surya-gets-a-very-rare-honor.jpg",
    },
    {
      url: "https://keralakaumudi.com/web-news/en/2022/11/NMAN0371532/image/surya-mammootty.1.1893276.jpg",
    },
  ];
  return (
    <div className="swiperfn-container">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={array.length > 1 ? true : false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        arrows={false}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        // renderButtonGroupOutside={true}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        renderDotsOutside={true}
      >
        {array.map((val) => (
          <div className="carousel-item">
            <div style={{ width: "100%" }}>
              <img
                src={val.url}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        ))}

        {/* <div className="carousel-item">
          <img
            src="https://d1vzdswwroofzl.cloudfront.net/wp-content/uploads/2022/06/Surya-gets-a-very-rare-honor.jpg"
            alt=""
            width="100%"
            height="100%"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://keralakaumudi.com/web-news/en/2022/11/NMAN0371532/image/surya-mammootty.1.1893276.jpg"
            alt=""
            width="100%"
            height="100%"
          />
        </div> */}
      </Carousel>
    </div>
  );
};

export default Swiperfn;
