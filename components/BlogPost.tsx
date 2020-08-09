import React, { useState, useEffect, useContext } from 'react';
import posts, { Post } from '../data/blog-posts';
import { Container, ContainerTypeMap } from '@material-ui/core';
import RhythmImage from './Image';
import styled, { css } from 'styled-components';
import RhythmCodeBlock from './CodeBlock';

import { useTypography } from '../libs/useTypography';
import styles from '../styles/base';
import { RhythmTypography } from '../libs/rhythm';

interface BlogPostProps {
    meta: Omit<Post, 'path'>;
    children: JSX.Element | JSX.Element[];
}
const BlogPost = (props: BlogPostProps) => {
    const typography = useTypography();

    const current = posts.map(({ title }) => title).indexOf(props.meta.title);
    const next = posts[current - 1];
    const prev = posts[current + 1];

    const [children, setChildren] = useState(props.children);
    useEffect(() => {
        let children = Array.isArray(props.children)
            ? props.children
            : [props.children];
        children = mutateChildren(children);
        setChildren(children);
    }, []);

    useEffect(() => {
        document.title = 'Silverhold Studios - ' + props.meta.title;
    }, []);
    if (typography === undefined) {
        return null;
    }
    return (
        <>
            <Container maxWidth="md">
                <StyleWrapper rhythmTypography={typography}>
                    <h1>{props.meta.title}</h1>
                    {children}
                    <hr />
                    <div>
                        <div>
                            {prev && (
                                <PostNavigation
                                    href={prev.path}
                                    position="< Previous post"
                                    title={prev.title}
                                />
                            )}
                        </div>
                        <div>
                            {next && (
                                <PostNavigation
                                    href={next.path}
                                    position="Next post >"
                                    title={next.title}
                                />
                            )}
                        </div>
                    </div>
                </StyleWrapper>
            </Container>
        </>
    );
};

interface StyleWrapperProps {
    rhythmTypography: RhythmTypography;
}
const StyleWrapper = styled.div`
    background-position: -1px -1px;
    background-image: linear-gradient(
        rgba(50, 50, 100, 0.25) 1px,
        transparent 1px
    );
    background-size: 1px
        ${(props: StyleWrapperProps) => props.rhythmTypography.rhythmHeight(1)};

    p {
        ${(props: StyleWrapperProps) =>
            styles.paragraph(props.rhythmTypography)}
    }
    pre {
        ${(props: StyleWrapperProps) =>
            styles.preformatted(props.rhythmTypography)}
    }
    a {
        ${(props: StyleWrapperProps) => styles.anchor(props.rhythmTypography)}
    }
    ul,
    ol {
        ${(props: StyleWrapperProps) => styles.list(props.rhythmTypography)}
    }
    blockquote {
        ${(props: StyleWrapperProps) =>
            styles.blockquote(props.rhythmTypography)}
    }
    image {
        ${(props: StyleWrapperProps) => styles.image(props.rhythmTypography)}
    }
    h1 {
        ${(props: StyleWrapperProps) => styles.H1(props.rhythmTypography)}
    }
    h2 {
        ${(props: StyleWrapperProps) => styles.H2(props.rhythmTypography)}
    }
    h3 {
        ${(props: StyleWrapperProps) => styles.H3(props.rhythmTypography)}
    }
    h4 {
        ${(props: StyleWrapperProps) => styles.H4(props.rhythmTypography)}
    }
    h5 {
        ${(props: StyleWrapperProps) => styles.H5(props.rhythmTypography)}
    }
    h6 {
        ${(props: StyleWrapperProps) => styles.H6(props.rhythmTypography)}
    }
`;

const mutateChildren = (children: any, level: number = 0) => {
    return children.map((child, i) => {
        const descendants = child?.props?.children;
        if (descendants?.props?.mdxType === 'img') {
            const imgProps = { ...descendants.props };
            delete imgProps.parentName;
            delete imgProps.originalType;
            delete imgProps.mdxType;
            child = <RhythmImage key={i} {...imgProps} />;
        } else if (child?.props?.mdxType === 'pre') {
            child = <RhythmCodeBlock key={i}>{child}</RhythmCodeBlock>;
        }
        return child;
    });
};

interface PostNavigationProps {
    href: string;
    position: string;
    title: string;
}
const PostNavigation = (props: PostNavigationProps) => (
    <a href={props.href}>
        {props.position}{' '}
        {/* <Typography variant={'subtitle1'} component="h4">
            {props.title}
        </Typography> */}
    </a>
);

export default BlogPost;
