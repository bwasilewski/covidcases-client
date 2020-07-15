import React from 'react'
import Card from './Card'
import {
  Field,
  Label,
  Control,
  Input } from 'bloomer'

const ZipcodeCard = ({ submit }) => {
  return (
    <Card>
      <form onSubmit={submit}>
        <Field>
          <Label htmlFor="zipcode">Please enter your zipcode</Label>
          <Control>
            <Input type="text" name="zipcode" />
          </Control>
        </Field>
        <Field>
          <Control>
            <button type="submit" className="button is-primary">Submit</button>
          </Control>
        </Field>
      </form>
    </Card>
  )
}

export default ZipcodeCard
