import { h } from 'preact';

// noinspection JSUnusedLocalSymbols, needed for use with preact-router
export const Home = (props: HomeProps) => (
    <div id="Home">
        <p>Hello</p>
    </div>
);

export interface HomeProps {
    path: String
}
