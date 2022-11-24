import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { db } from "../firebase";
export default function Categories() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const q = await query(collection(db, "category"));
    const data = await getDocs(q);
    setData(data.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="cat">
      <Carousel
        swipeable={true}
        draggable={true}
        //   showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        // autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        // transitionDuration={2000}

        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        //   deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="popular__ani"
      >
        {data.map((d, i) => {
          return (
            <Link
            key={i}
              style={{ textDecoration: "none", color: "inherit" }}
              href={`/category/${d.name}`}
            >
              <div className="cat__div">
                <img className="rounded-full" src={d.image} />
                <p>{d.name}</p>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
}
