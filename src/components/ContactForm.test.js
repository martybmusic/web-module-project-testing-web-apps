import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.findByText(/Contact Form/i);
    expect(header).toBeVisible;
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, "Pal");

    const lastName = screen.getByLabelText("Last Name*");
    userEvent.type(lastName, "McCartney");

    const email = screen.getByLabelText("Email*");
    userEvent.type(email, "thelongandwindingroad@thebeatles.com");

    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(1)

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = await screen.findAllByText(/error/i);
    
    expect(errors.length).toEqual(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, "Paulson");

    const lastName = screen.getByLabelText("Last Name*");
    userEvent.type(lastName, "McCartney");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = await screen.findAllByText(/error/i);

    expect(errors.length).toEqual(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, "Paulperson");

    const lastName = screen.getByLabelText("Last Name*");
    userEvent.type(lastName, "McCartney");

    const email = screen.getByLabelText("Email*");
    userEvent.type(email, "Best Email Ever");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorsEmail = await screen.findByText(/email must be a valid email address/i);

    expect(errorsEmail).toBeInTheDocument;
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, "Paulman");

    const email = screen.getByLabelText("Email*");
    userEvent.type(email, "yesterday@thebeatles.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorsLastName = await screen.findByText(/lastName is a required field/i);
    expect(errorsLastName).toBeInTheDocument;
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, "Paulll");

    const lastName = screen.getByLabelText("Last Name*");
    userEvent.type(lastName, "McCartney");

    const email = screen.getByLabelText("Email*");
    userEvent.type(email, "therealme@thebeatles.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const submittedFirstName = await screen.findByText(/Paulll/i);
    const submittedLastName = await screen.findByText(/McCartney/i);
    const submittedEmail = await screen.findByText(/therealme@thebeatles.com/i);

    expect(submittedFirstName).toBeVisible;
    expect(submittedLastName).toBeVisible;
    expect(submittedEmail).toBeVisible;
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, "Paull");

    const lastName = screen.getByLabelText("Last Name*");
    userEvent.type(lastName, "McCartney");

    const email = screen.getByLabelText("Email*");
    userEvent.type(email, "therealme@thebeatles.com");

    const message = screen.getByLabelText("Message");
    userEvent.type(message, "Let it be, let it be");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const submittedFirstName = await screen.findByText(/Paull/i);
    const submittedLastName = await screen.findByText(/McCartney/i);
    const submittedEmail = await screen.findByText(/therealme@thebeatles.com/i);
    const submittedMessage = await screen.findByDisplayValue("Let it be, let it be");

    expect(submittedFirstName).toBeVisible;
    expect(submittedLastName).toBeVisible;
    expect(submittedEmail).toBeVisible;
    expect(submittedMessage).toBeVisible;
});