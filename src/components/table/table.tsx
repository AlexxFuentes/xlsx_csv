/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell, Footer, FooterRow, FooterCell } from '@table-library/react-table-library/table'
import { Dispatch, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'


interface Props {
    headers: string[];
    footers: string[];
    nodes: any[];
    setData: Dispatch<SetStateAction<any[]>>;
}

export function CustomTable({ nodes, headers, footers, setData }: Props) {

    const data = { nodes }

    const theme = useTheme([getTheme(),
    {
        Table: `--data-table-library_grid-template-columns: 150px 310px repeat(${headers.length - 2}, auto);`,
        BaseCell: `
            &:nth-of-type(1) {
                left: 0px;
            }
            &:nth-of-type(2) {
                left: 150px;
            }
        `,
    },
    ])

    const handleUpdate = (value: string, id: number, property: string) => {

        setData((state: any[]) => {
            return state.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        [property]: value
                    }
                }
                return item
            })
        })
    };

    return (
        <Table data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
            {(tableList: any) => (
                <>
                    <Header>
                        <HeaderRow>
                            <HeaderCell key={uuidv4()} pinLeft resize>{headers[0]}</HeaderCell>
                            <HeaderCell key={uuidv4()} pinLeft resize>{headers[1]}</HeaderCell>
                            {
                                headers?.slice(2).map((header) => <HeaderCell key={uuidv4()} resize>{header}</HeaderCell>)
                            }
                        </HeaderRow>
                    </Header>

                    <Body>
                        {tableList.map((item: any) => (
                            <Row key={uuidv4()} item={item}>
                                <Cell pinLeft>
                                    <input
                                        className='bg-transparent'
                                        value={item[headers[0]]}
                                        type='text'
                                        onChange={(e) => handleUpdate(e.target.value, item.id, 'dni')}
                                    />
                                </Cell>
                                <Cell pinLeft>{item[headers[1]]}</Cell>
                                {
                                    headers.slice(2).map((header: string) => (<Cell key={uuidv4()}>{item[header]}</Cell>))
                                }
                            </Row>
                        ))}
                    </Body>

                    <Footer>
                        <FooterRow>
                            <FooterCell key={uuidv4()} pinLeft resize>{footers[0]}</FooterCell>
                            <FooterCell key={uuidv4()} pinLeft resize>{footers[1]}</FooterCell>
                            {
                                footers?.slice(2).map((footer) => <FooterCell key={uuidv4()} resize>{footer}</FooterCell>)
                            }
                        </FooterRow>
                    </Footer>
                </>
            )}
        </Table>
    )
}