import { FeedItem } from '../../types/custom';
import { formatDate } from '../utils/functions';

type Props = {
	article: FeedItem;
};


const NewsArticle = ({ article }: Props) => {
	return (
		<article className="flex-col items-center justify-center w-full h-full max-w-4xl mx-auto">




			{/* Image Container */}
			<div className="flex flex-col items-center justify-center mx-auto mb-6 w-fit">
				<a
					href={article.link}
					target="_blank"
					rel="noopener noreferrer"
					className="w-full h-auto mb-4 rounded-lg"
				>
					<img
						src={article.media}
						alt={article.title}
						className="object-contain w-full h-auto transition-all duration-300 ease-in-out rounded-lg sm:h-60 hover:scale-105"
					/>
				</a>
				<p className="my-2 text-sm italic font-normal text-center text-gray-700">{formatDate(article.pubDate)}</p>
			</div>

			{/* Title */}
			<h1 className="mb-6 text-3xl font-semibold text-center text-white sm:text-5xl">{article.title}</h1>

			{/* Body */}
			<p className="text-xl text-center text-white sm:text-2xl">{article.description}</p>
		</article>
	);
};

export default NewsArticle;
