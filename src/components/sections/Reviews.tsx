'use client';

import SectionHeading from '@/components/common/SectionHeading';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { userReviewData } from '@/lib/constants';
import ReviewCard from './ReviewCard';

const Reviews = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1234 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1324, min: 764 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 764, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div id="testimonials" className="py-24 bg-gray-100 dark:bg-gray-900 scroll-mt-24">
      <div className="w-[80%] mx-auto">
        <SectionHeading
          title_1="Client"
          title_2="Reviews"
          description="What my clients say about working with me."
        />
        <div className="mt-14">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            arrows={true}
            ssr={true}
          >
            {userReviewData.map((user) => {
              return (
                <div key={user.id}>
                  <ReviewCard user={user} />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
