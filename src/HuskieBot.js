import React, { Component } from 'react';
import styled from '@emotion/styled';

import { Asker } from './components/Asker/Asker';
import { BoostPanel } from './components/BoostPanel/BoostPanel';
import { HuskieIconTile } from './components/HuskieIconTile/HuskieIconTile';
import { huskisms } from '../src/assets/huskisms';
import { PatterPanel } from './components/PatterPanel/PatterPanel';
import { SegmentedSlider } from './components/SegmentedSlider/SegmentedSlider';

const StyledHeader = styled('header')`
  min-height: 20vh;
`;

const StyledInterations = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 28vh;
  padding: 16px;
`;

const StyledWrapper = styled('div')`
  align-items: center;
  background-color: hsl(335, 23%, 18%);
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: space-between;
  text-align: center;
  min-height: 100vh;
`;

const newChat = type => {
  let chat;
  chat = huskisms[type][Math.floor(Math.random() * huskisms[type].length)]
  return chat;
};

class HuskieBot extends Component {
  constructor(props) {
		super(props);

		const { 
      adviceIsShown = false,
      boostsAreShown = false,
      chat = newChat('colloquialisms'),
      patterIsShown = false,
      previousQuestion = '',
    } = props;

    this.updateChat = this.updateChat.bind(this);
    this.updateQuestionChats = this.updateQuestionChats.bind(this);

		this.state = {
      adviceIsShown,
      boostsAreShown,
      chat,
      patterIsShown,
      previousQuestion,
		};
  }

  updateQuestionChats() {
    this.setState({ chat: newChat('answers'), previousQuestion: document.getElementById('questionInput').value });
  }

  updateChat = type => {
    let chat;
    chat = huskisms[type][Math.floor(Math.random() * huskisms[type].length)]
    this.setState({ chat: chat });;

    if(type === 'questions') {
      this.setState({ adviceIsShown: true, boostsAreShown: false, patterIsShown: false, chat: newChat('questions'), previousQuestion: ''})
    } else if(type === 'food') {
      this.setState({adviceIsShown: false, boostsAreShown: true, patterIsShown: false})
    } else if(type === 'coversational') {
      this.setState({ adviceIsShown: false, boostsAreShown: false, patterIsShown: true})
    }
  };
    
  render() {
    const { adviceIsShown, boostsAreShown, chat, patterIsShown, previousQuestion } = this.state;

    return (
      <StyledWrapper>
        <StyledHeader>
          <h1>HuskieBot</h1>
        </StyledHeader>
        <HuskieIconTile adviceIsShown={adviceIsShown} chat={chat} previousQuestion={previousQuestion} />
        <StyledInterations>
        { adviceIsShown && <Asker updateQuestionChat={this.updateQuestionChats} /> }
        { boostsAreShown && <BoostPanel onClick={this.updateChat}/> }
        { patterIsShown && <PatterPanel onClick={this.updateChat} /> }
        <SegmentedSlider onClick={this.updateChat} />
      </StyledInterations>
    </StyledWrapper>
    )
  }
}

HuskieBot.defaultProps = {
  chat: newChat('greetings'),
};

export { HuskieBot };
