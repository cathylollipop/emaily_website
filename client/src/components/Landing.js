import React from 'react';

const Landing = () => {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h1>
                    Emaily!
                </h1>
                Collect feedback from your users.
            </div>
            <div className="card-panel pink lighten-5">
                    <span className="blue-text text-darken-2 card-title">** Instructions on how to use emaily website **</span>
                    <blockquote>1. Login to the website by authorizing your Google account.</blockquote>
                    <blockquote>2. Click Emaily logo on left corner of header to the survey creating page.</blockquote>
                    <blockquote>3. You won't be able to create surveys if you have no credits. Click "ADD CREDITS" button to make a payment.</blockquote>
                    <blockquote>4. Put a random valid email (@.com), MM/YY and CVC number. Put credit card number: 4242 4242 4242 4242.</blockquote>
                    <blockquote>5. When you have credits, click + button at the right bottom of the page and you'll be able to create your own survey.</blockquote>
                    <blockquote>6. Try to send to your own email account a suvey and enjoy your own feedback!</blockquote>
            </div>
        </div>

    );
};

export default Landing;