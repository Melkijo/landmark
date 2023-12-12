import { LandCertificate } from "@/types";
import Link from "next/link";

function Card(LandCertificate: LandCertificate) {
  return (
    <div className="card card-compact w-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Land Certificate</h2>
        <p>{LandCertificate.owner}</p>

        <p>{LandCertificate.location}</p>
        <p>{LandCertificate.description}</p>

        <div className="card-actions justify-end">
          <Link href={`/certificate/${LandCertificate.id}`}>
            <button className="btn btn-primary btn-sm">Check</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-52">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
}

export { CardSkeleton, Card };
