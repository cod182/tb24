import { FeedItem } from '../../types/custom';
import { formatDate } from '../utils/functions';

type Props = {
	article: FeedItem;
};


const NewsArticle = ({ article }: Props) => {
	console.log(article);
	return (
		<article className="max-w-2xl mx-auto p-4 flex-col items-start justify-start w-full h-full">

			{/* Title */}
			<h1 className="text-3xl text-start font-semibold mb-4">{article.title}</h1>


			{/* Image Container */}
			<div className="mb-6 w-full flex flex-col items-start justify-center">
				<a
					href={article.link}
					target="_blank"
					rel="noopener noreferrer"
					className="w-full h-auto rounded-lg mb-4"
				>
					<img
						src={article.media}
						alt={article.title}
						className="w-fit h-auto sm:h-60 object-contain rounded-lg hover:scale-105 transition-all ease-in-out duration-300"
					/>
				</a>
				<p className="font-normal text-sm italic text-gray-700 text-start my-2">{formatDate(article.pubDate)}</p>
			</div>



			{/* Body */}
			<p className="text-xl text-start text-gray-800">{article.description}</p>
		</article>
	);
};

export default NewsArticle;
