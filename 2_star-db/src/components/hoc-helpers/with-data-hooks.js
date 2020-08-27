import React, { useState, useEffect } from 'react';

import Spinner from '../spinner';

const withData = (View, getData) => {
	return (props) => {
		const [data, setData] = useState(null);

		useEffect(() => {
			getData().then((data) => {
				setData(data);
			});
		}, []);

		if (!data) {
			return <Spinner />;
		}

		return <View {...props} data={data} />;
	};
};

export default withData;
