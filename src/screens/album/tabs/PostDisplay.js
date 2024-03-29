import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

import { PostActions } from '../../../components';
import { PostDetails } from '../../../components';

import * as api from '../../../redux/apiServices/postsApi';
import { useGetUserQuery } from '../../../redux/apiServices/authApi';

import { currentUser, loggedInStatus } from '../../../redux/slices/selectors';

 const PostDisplay = ({ postId, navigation }) => {
    const { data, error, isLoading } = api.useGetSinglePostQuery(postId);
    const postUser = useGetUserQuery(data?.post?.user);
    
    const userId = useSelector(currentUser);
    const { isLoggedIn } = useSelector(loggedInStatus);

    return (
        <>
            {data && <View style={styles.postContainer}>
                <View style={{ position: 'relative' }}>
                    <View style={styles.postLayout}>
                        <Image source={{ uri: postUser?.data?.user?.photo }} style={styles.postPhoto} />
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.postUser}>{`${postUser?.data?.user?.firstname} ${postUser?.data?.user?.lastname}`}</Text>
                        </View>
                    </View>
                    <Image source={{ uri: data?.post.photo }} style={[styles.postImage, { borderRadius: 10, }]} />
                </View>
                <PostActions data={data?.post} userId={userId} color={'#fff'} isLoggedIn={isLoggedIn} navigation={navigation} />
                <PostDetails data={data?.post} userId={userId} color={'#fff'} />
            </View>}
        </>
  )
}

const styles = StyleSheet.create({
    postContainer: {
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
      },
    postLayout: { 
        marginTop: 5, 
        flexDirection: 'row', 
        position: 'absolute', 
        top: 0, 
        left: 5, 
        zIndex: 999 
    },
    postPhoto: { 
        width: 35, 
        height: 35, 
        marginRight: 5, 
        borderRadius: 50 
    },
    userPhoto: { 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20 
    },
    postUser: { 
        fontWeight: 'bold', 
        fontStyle: 'italic', 
        fontSize: 15, 
        color: '#fff' 
    },
    postImage: {
        width: '100%',
        height: 300,
    },
    postInfo: {
        flexDirection: 'row',
        marginTop: 9,
        marginBottom: 5,
    },
    postText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    postCommentLayout: { 
        marginTop: 10, 
        flexDirection: 'row', 
        zIndex: 99999 
    },
    postCommentImage: { 
        width: 30, 
        height: 30, 
        borderRadius: 50, 
        marginRight: 5 
    },
    modalImageSize: { 
        width: 35, 
        height: 35, 
        marginRight: 5, 
        borderRadius: 50 
    },
    favorites: { 
        marginLeft: 'auto', 
        padding: 5, 
        paddingTop: 0 
    },
    commentSection: { 
        paddingLeft: 10, 
        paddingRight: 10 
    },
    postImageLayout: { 
        marginTop: 40, 
        flexDirection: 'row', 
        position: 'absolute', 
        top: 0, 
        left: 5, 
        zIndex: 999 
    },
    separation: { 
        flex: 1, 
        height: 1, 
    },
    reviewsSectionLayout: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    reviewsSection: { 
        width: 70, 
        textAlign: 'center', 
        paddingLeft: 5, 
        paddingRight: 5, 
        fontWeight: 'bold' 
    },
    reviews: { 
        marginLeft: 15, 
        marginRight: 15 
    },
    reviewsTitle: { 
        flex: 1, 
        height: 1, 
        backgroundColor: 'black' 
    },
    userPostName: { 
        fontWeight: 'bold', 
        fontStyle: 'italic', 
        fontSize: 15, 
        color: '#fff' 
    },
    verifyButton: {
        position: 'absolute',
        right: 0,
        padding: 4,
        alignSelf: 'center',
        fontWeight: 'bold',
        borderRadius: 3,
      },
      text: {
        fontWeight: 'bold',
        fontSize: 12,
      }
});

export default PostDisplay;