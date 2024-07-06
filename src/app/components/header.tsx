"use client"

import { Inter, Inter_Tight, Saira_Stencil_One } from "next/font/google"
import styled from "styled-components"
import { PrimaryInput, PrimaryInputWSearchIcon } from "./primary-input"
import { CartControl } from "./cart-control"

const sairaStencil = Saira_Stencil_One({
    weight:['400'],
    subsets: ['latin'] 
})
 
interface HeaderProps {

}

const TagHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 160px;

     > div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
    }

    @media (min-width: ${props => props.theme.desktopBreakpoint}){
        padding: 20px 160px;
    }

`
const Logo = styled.a`
    color: var(--logo-color);
    font-weight: 400;
    font-size: 40px;
    line-height: 150%;

`
export function Header(props : HeaderProps){
    return(
        <TagHeader>
            <Logo className={sairaStencil.className}>davi</Logo>
            <div>
                <PrimaryInputWSearchIcon placeholder="Procurando por algo específico?"/>
                <CartControl/>
            </div>
        </TagHeader>
    )
}