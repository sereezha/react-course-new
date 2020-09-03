import React, { useState, useEffect } from 'react';

import Spinner from '../spinner';

const withData = (View) => {
	return (props) => {
		const [data, setData] = useState(null);

		useEffect(() => {
			props.getData().then((data) => {
				setData(data);
			});
		}, [props.getData, props]);

		if (!data) {
			return <Spinner />;
		}

		return <View {...props} data={data} />;
	};
};

export default withData;
