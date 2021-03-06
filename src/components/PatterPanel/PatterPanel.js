import React from 'react';

import { PatterButton } from '../PatterButton/PatterButton';
import styled from '@emotion/styled';

const StyledButtonGroup = styled('div')`
	align-items: center;
	display: flex;
	text-align: inherit;
`;

const PatterPanel = ({ onClick }) => (
	<StyledButtonGroup>
		<PatterButton
			onClick={() => onClick('activities')}
			text="Activites"
		/>
		<PatterButton
			onClick={() => onClick('wisdom')}
			text="Wisdom"
		/>
		<PatterButton
			onClick={() => onClick('exclamations')}
			text="Drivel"
		/>
	</StyledButtonGroup>
);

PatterPanel.defaultProps = {
	isDisabled: false,
};

export { PatterPanel };