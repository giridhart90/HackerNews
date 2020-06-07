import React from 'react';
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';
import axios from 'axios';
import { Spinner, Table } from 'reactstrap';
import HackerTable from './HackerTable';

jest.mock("axios");

describe('Renders', () => {
    it('Spinner Renders', () => {
        const component = renderer.create(<Spinner />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Hacker Table Renders', () => {
        const component = renderer.create(<Table />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

test('Renders HackerTable', () => {
    const component = renderer.create(<HackerTable />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
