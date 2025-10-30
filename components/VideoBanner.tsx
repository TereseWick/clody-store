
'use client';


type Props={
    src?: string;
    poster?: string;

};

export default function VideoBanner({
    src='/media/InTheBag.mp4', 
    poster='/media/image10.jpeg', 
       }:  Props) {
        return (
            <div
            className="
            mx-auto rounded-2xl overflow-hidden border border-brand-200 bg-brand-100
            w-full max-w-[48rem] md:max-w-[58rem] lg:max-w-[56rem]
            px-2 py-2
            "
            >

            <video
            className="
            block w-full
            h-[980px] md:h-[980px] lg:h-[1480px]
            object-cover
            rounded-xl
            "
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            />
            </div>
            );

        }
                

        
        