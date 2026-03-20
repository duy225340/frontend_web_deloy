"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef } from "react";
import "swiper/css/navigation";
import "swiper/css";
import Image from "next/image";

import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/store";

const PreviewSliderModal = () => {
  const { closePreviewModal, isModalPreviewOpen } = usePreviewSlider();

  const data = useAppSelector((state) => state.productDetailsReducer.value);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div
      className={`preview-slider w-full h-screen z-[999999] inset-0 flex justify-center items-center bg-black/95 ${isModalPreviewOpen ? "fixed" : "hidden"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePreviewModal();
      }}
    >
      <button
        onClick={() => closePreviewModal()}
        aria-label="button for close modal"
        className="absolute top-6 right-6 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white z-[1000000]"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      {/* Điều hướng */}
      <div className="absolute inset-x-4 sm:inset-x-10 flex justify-between items-center pointer-events-none z-[1000000]">
        <button
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white pointer-events-auto shadow-2xl"
          onClick={handlePrev}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        <button
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white pointer-events-auto shadow-2xl"
          onClick={handleNext}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <div className="w-full max-w-5xl px-12">
        <Swiper ref={sliderRef} slidesPerView={1} spaceBetween={50} loop={true} className="w-full h-full">
          {(data.imgs?.previews || []).map((img: string, index: number) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center h-[70vh] sm:h-[85vh]">
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`product image ${index}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PreviewSliderModal;
