import React from 'react'
import { 
  Container, 
  Footer,
  Level,
  LevelItem,
  LevelLeft,
  LevelRight } from 'bloomer'

const AppFooter = props => {
  return (
    <Footer>
      <Container>
        <Level>
          <LevelLeft>
            <LevelItem>
              <p>Who made this?</p>
            </LevelItem>
          </LevelLeft>
          <LevelRight>
          <a href="mailto:benwasilewski@gmail.com">benwasilewski@gmail.com</a>
          </LevelRight>
        </Level>
      </Container>
    </Footer>
  )
}

export default AppFooter