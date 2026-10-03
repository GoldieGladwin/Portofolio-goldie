import { QuoteIcon } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import type { UserReview } from '@/types';

type Props = {
  user: UserReview;
};

const ReviewCard = ({ user }: Props) => {
  return (
    <div className="bg-white shadow-md dark:bg-gray-800 rounded-2xl m-3 p-6 relative min-h-[280px] sm:min-h-[300px] flex flex-col justify-between">
      <div>
        <QuoteIcon className="w-8 h-8 absolute top-4 right-4 text-red-600 dark:text-yellow-300 opacity-20" />
        <div className="mt-2 flex items-center">
          <FaStar className="w-4 h-4 text-yellow-600 dark:text-yellow-300" />
          <FaStar className="w-4 h-4 text-yellow-600 dark:text-yellow-300" />
          <FaStar className="w-4 h-4 text-yellow-600 dark:text-yellow-300" />
          <FaStar className="w-4 h-4 text-yellow-600 dark:text-yellow-300" />
          <FaStar className="w-4 h-4 text-yellow-600 dark:text-yellow-300" />
        </div>
        <p className="mt-5 text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
          {user.review}
        </p>
      </div>

      <div className="pt-5 border-t border-gray-100 dark:border-gray-700/60 mt-4 flex items-center space-x-3.5">
        <Image
          src={user.userImage}
          alt={`Foto profil ulasan dari ${user.name}`}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover shrink-0 shadow-xs"
        />
        <div className="min-w-0">
          <h4 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200 truncate">{user.name}</h4>
          <p className="text-xs text-gray-500 truncate">{user.profession}</p>
        </div>
      </div>
    </div>
  );
};


export default ReviewCard;
