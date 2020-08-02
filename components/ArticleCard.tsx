import React from 'react';
import { Post } from '../data/blog-posts';
// import { Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import styled from 'styled-components';
import { baseSpacing, shevy } from './CoreComponents';
import { darken, lighten } from '@material-ui/core';

interface ArticleCardProps extends Post {}

const CardContainer = styled.div`
    background-color: #333333;
    color: white;
`;

const Title = styled.div``;
const Subheader = styled.div``;
const Body = styled.div``;
const CardTitle = styled.div`
    padding: ${baseSpacing(0.5)};

    ${Title} {
        ${shevy.h4};
    }

    ${Subheader} {
        ${shevy.h6};
        color: ${lighten('#000000', 0.5)};
    }
`;

interface CardImageProps {
    image: string;
    title?: string;
}
const CardImage = styled.div`
    height: 0;
    padding-top: 56.25%;
    background-image: url(${(props: CardImageProps) => props.image});
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const CardContent = styled.div`
    padding: ${baseSpacing(0.5)};

    ${Body} {
        ${shevy.content}
    }

    ${Subheader} {
        ${shevy.content}
        color: ${lighten('#000000', 0.5)};
        margin-bottom: 0px;
    }
`;

const ArticleCard = (props: ArticleCardProps) => {
    return (
        <CardContainer>
            <a href={props.path}>
                <CardTitle>
                    <Title>{props.title}</Title>
                    <Subheader>{props.publishedAt || 'Unknown Date'}</Subheader>
                </CardTitle>
                <CardImage image={props.banner} title={props.title} />
                <CardContent>
                    <Body>{props.summary}</Body>
                    <Subheader>Continue reading...</Subheader>
                </CardContent>
            </a>
        </CardContainer>
    );
};

export default ArticleCard;
