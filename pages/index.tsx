import React, { useRef } from 'react';
import styled from 'styled-components';
import {
    CssBaseline,
    Grid,
    Container,
    darken,
    Button
} from '@material-ui/core';

import ArticleCard from '../components/ArticleCard';
import posts from '../data/blog-posts';
import { shevy } from '../components/CoreComponents';

const Background = styled.div`
    background-color: #101010;
    background-position: -1px 0;
    background-size: 1em 1em;
    height: 100vh;
`;

interface SplashImageProps {
    image: string;
    title?: string;
}
const SplashImage = styled.div`
    height: 100vh;
    background-image: linear-gradient(
            0deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.5) 20%,
            rgba(0, 0, 0, 0.3) 100%,
            rgba(255, 255, 255, 0) 100%
        ),
        url(${(props: SplashImageProps) => props.image});
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-content: center;
    justify-content: center;
`;

const Logo = styled.div``;
const Header = styled.div``;
const Footer = styled.div``;
const Title = styled.div``;
const AuthorText = styled.div``;
const AuthorName = styled.span``;
const CreatedBy = styled.span``;
const ButtonContainer = styled.div``;
const TitleContainer = styled.div`
    display: block;
    color: white;
    position: relative;
    font-family: 'Fjalla One', sans-serif;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;

    ${Header} {
        ${Title} {
            ${shevy.h1};
            margin: 32px 32px 8px 32px;
        }

        ${AuthorText} {
            ${shevy.h6};
            margin-bottom: 0px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
                sans-serif;

            ${CreatedBy} {
                color: rgb(255 255 255 / 60%);
                font-style: italic;
            }
            text-align: center;
            ${AuthorName} {
                color: white;
                font-weight: 600px;
            }
        }
    }

    ${Footer} {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 32px;

        ${Logo} {
            display: block;
            height: 100px;
            width: 100px;
            background-size: 70%;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url('/images/logo2.png');
            background-color: black;
            border-radius: 50%;
            margin-bottom: 20px;
            align-self: center;
        }

        ${ButtonContainer} {
            > * {
                margin: 0px 8px;
            }
        }
    }
`;

const Transition = styled.div`
    height: 100px;
    background-color: black;
`;

const StyledButton = styled(Button)`
    && {
        border: 1px solid white;
        color: white;
        width: 120px;
        border-radius: 0px;
    }
`;

const Index = () => {
    const blogsRef = useRef();

    const handleScrollTo = (elRef) => {
        // Incase the ref supplied isn't ref.current
        const el = elRef.current ? elRef.current : elRef;

        // Scroll the element into view
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <Background>
            <CssBaseline />
            <SplashImage image={'/images/lion.jpg'}>
                <TitleContainer>
                    <Header>
                        <Title>SILVERHOLD STUDIOS</Title>
                        <AuthorText>
                            <CreatedBy>Created by </CreatedBy>
                            <AuthorName>Peter Gates</AuthorName>
                        </AuthorText>
                    </Header>
                    <Footer>
                        <Logo />

                        <ButtonContainer>
                            <StyledButton
                                onClick={() => {
                                    handleScrollTo(blogsRef);
                                }}
                            >
                                About
                            </StyledButton>
                            <StyledButton
                                onClick={() => {
                                    handleScrollTo(blogsRef);
                                }}
                            >
                                Articles
                            </StyledButton>
                            <StyledButton
                                onClick={() => {
                                    handleScrollTo(blogsRef);
                                }}
                            >
                                Projects
                            </StyledButton>
                        </ButtonContainer>
                    </Footer>
                </TitleContainer>
            </SplashImage>
            <Transition />
            <div ref={blogsRef}></div>

            {/* <Container maxWidth="md">
                <Grid container spacing={2}>
                    {posts.map((post, index) => (
                        <Grid key={index} item xs={12} sm={6}>
                            <ArticleCard {...post} />
                        </Grid>
                    ))}
                </Grid>
                <span>
                    Photo by{' '}
                    <a href="https://unsplash.com/@mattkerslake?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                        Matthew Kerslake
                    </a>{' '}
                    on{' '}
                    <a href="https://unsplash.com/s/photos/lion?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                        Unsplash
                    </a>
                </span>
            </Container> */}
        </Background>
    );
};
export default Index;
