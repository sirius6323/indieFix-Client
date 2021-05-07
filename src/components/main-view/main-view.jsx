import React from 'react';

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [
				{
					_id: 1,
					Title: 'Get Out',
					Description: `Get Out plot follows Chris Washington. He is a young African American man who uncovers dark and disturbing secrets as he meets his white girlfriend Rose Armitage. Chris and his girlfriend Rose have reached the milestone in their dating when the couple meets each other's parents.`,
					ImageURL:
						'https://www.imdb.com/title/tt5052448/mediaviewer/rm1537293568/',
				},
				{
					_id: 2,
					Title: 'The Life Aquatic with Steve Zissou',
					Description: `Renowned oceanographer Steve Zissou (Bill Murray) has sworn vengeance upon the rare shark that devoured a member of his crew. In addition to his regular team, he is joined on his boat by Ned (Owen Wilson), a man who believes Zissou to be his father, and Jane (Cate Blanchett), a journalist pregnant by a married man. They travel the sea, all too often running into pirates and, perhaps more traumatically, various figures from Zissou's past, including his estranged wife, Eleanor (Anjelica Huston).`,
					ImageURL:
						'https://www.imdb.com/title/tt0362270/mediaviewer/rm4292775168/',
				},
				{
					_id: 3,
					Title: 'The Isle of Dogs',
					Description: `When, by executive decree, all the canine pets of Megasaki City are exiled to a vast garbage-dump called Trash Island, 12-year-old Atari sets off alone in a miniature Junior-Turbo Prop and flies across the river in search of his bodyguard-dog, Spots. There, with the assistance of a pack of newly-found mongrel friends, he begins an epic journey that will decide the fate and future of the entire Prefecture.`,
					ImageURL:
						'"https://www.imdb.com/title/tt5104604/mediaviewer/rm1483320321/',
				},
			],
		};
	}

	render() {
		const { movies } = this.state;

		if (movies.length === 0)
			return (
				<div className='main-view'>
					Please check back soon. Movies will be added.
				</div>
			);

		return (
			<div className='main-view'>
				{movies.map((movie) => (
					<div key={movie.id}>{movie.Title}</div>
				))}
			</div>
		);
	}
}

export default MainView;
