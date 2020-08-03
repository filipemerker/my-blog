import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components'

const CookieBanner = () => {
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')

    if (!cookiesAccepted) {
      setDisplay(true)
    }
  }, [])

  if (!display) {
    return null
  }

  return (
    <Banner>
      <Text>Este site utiliza cookies para melhorar a sua experiência.</Text>
      <Button
        onClick={() => {
          localStorage.setItem('cookiesAccepted', true)
          setDisplay(false)
        }}
      >
        Ok
      </Button>
    </Banner>
  )
}

const Banner = styled.div`
  position: fixed;
  z-index: 100;
  padding: 25px 50px;
  max-width: 550px;
  width: 95%;

  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: #769284;
  box-shadow: 0px 0px 10px -4px black;
  box-sizing: border-box;

  display: flex;
  justify-contet: space-between;
  align-items: center;
  flex-direction: column;
`

const Text = styled.p`
  color: white;
  font-size: 15px;
  width: 80%;
  text-align: center;
  margin-bottom: 20px;
`

const Button = styled.button`
  width: 70px;
  height: 37px;
  background: #55695f;
  border: none;
  color: white;
  cursor: pointer;
`

export default memo(CookieBanner)
