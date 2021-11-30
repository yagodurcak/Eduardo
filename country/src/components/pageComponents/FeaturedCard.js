import React from 'react';
import imagen from "../../IMG/home/card1.svg";
import imagen2 from "../../IMG/home/card2.svg";
import imagen3 from "../../IMG/home//Group 10card3.svg";
import imagen4 from "../../IMG/home/card4.svg";
import styled from '@emotion/styled';
import up from "../../IMG/home/icon-trending-upup.svg"

const CardConteiner = styled.div`
    display: flex;

    width: 100%;
    height: 200px;
    margin-top: 40px;
`
const CardItem = styled.div`
        display: grid;
        flex: 1;
        border-radius: 10px;
        -webkit-box-shadow: 1px 0px 15px -2px #000000; 
box-shadow: 1px 0px 15px -8px #000000;
        margin: 20px 30px;
        padding: 30px;
        /* justify-content: space-space-around; */
       
`

const FeaturedIcon = styled.img`
    padding: 0px 20px;
    height: 70px;
`
const UpIcon = styled.img`
    padding: 0px 20px;
    height: 30px;
`

const TitleCardConteiner = styled.div`
  display: grid;
  /* justify-content: center; */
  align-items: center;
`
const SubTitleCard = styled.h3`
    color: gray;
    font-size: 15px;
    font-weight: 500;
`
const FirstCardConteiner = styled.div`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    /* width: 100%; */
`
const SecondCardConteiner = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* width: 100%; */
`
const DifCardConteiner = styled.div`
    display: flex;
    /* justify-content: left; */
    align-items: center;
    color: #4BDE97;
    padding: 0px 10px;
    /* width: 100%; */
`



function FeaturedCard() {
    return (
        <CardConteiner>
            <CardItem>
                <FirstCardConteiner>
                    <div>
                        <FeaturedIcon src={imagen} alt="" />
                    </div>
                    <div>
                        <TitleCardConteiner>
                            <h2>185</h2>
                            <SubTitleCard>Visitas del mes</SubTitleCard>
                        </TitleCardConteiner>
                    </div>
                </FirstCardConteiner>
                <SecondCardConteiner>
                    <DifCardConteiner>
                        <UpIcon src={up} alt="" />
                        <h3>4.07%</h3>
                    </DifCardConteiner>
                    <SubTitleCard>Último mes</SubTitleCard>
                </SecondCardConteiner>
            </CardItem>
            <CardItem>
                <FirstCardConteiner>
                    <div>
                        <FeaturedIcon src={imagen2} alt="" />
                    </div>
                    <div>
                        <TitleCardConteiner>
                            <h2>25</h2>
                            <SubTitleCard>Tramites en Proceso</SubTitleCard>
                        </TitleCardConteiner>
                    </div>
                </FirstCardConteiner>
                <SecondCardConteiner>
                    <DifCardConteiner>
                        <UpIcon src={up} alt="" />
                        <h3>4.07%</h3>
                    </DifCardConteiner>
                    <SubTitleCard>Último mes</SubTitleCard>
                </SecondCardConteiner>
            </CardItem>
            <CardItem>
                <FirstCardConteiner>
                    <div>
                        <FeaturedIcon src={imagen3} alt="" />
                    </div>
                    <div>
                        <TitleCardConteiner>
                            <h2>25</h2>
                            <SubTitleCard>Quejas del mes</SubTitleCard>
                        </TitleCardConteiner>
                    </div>
                </FirstCardConteiner>
                <SecondCardConteiner>
                    <DifCardConteiner>
                        <UpIcon src={up} alt="" />
                        <h3>4.07%</h3>
                    </DifCardConteiner>
                    <SubTitleCard>Último mes</SubTitleCard>
                </SecondCardConteiner>
            </CardItem>
            <CardItem>
                <FirstCardConteiner>
                    <div>
                        <FeaturedIcon src={imagen4} alt="" />
                    </div>
                    <div>
                        <TitleCardConteiner>
                            <h2>10</h2>
                            <SubTitleCard>Actividades Programadas</SubTitleCard>
                        </TitleCardConteiner>
                    </div>
                </FirstCardConteiner>
                <SecondCardConteiner>
                    <DifCardConteiner>
                        <UpIcon src={up} alt="" />
                        <h3>4.07%</h3>
                    </DifCardConteiner>
                    <SubTitleCard>Último mes</SubTitleCard>
                </SecondCardConteiner>
            </CardItem>
            
        </CardConteiner>
    )
}

export default FeaturedCard
