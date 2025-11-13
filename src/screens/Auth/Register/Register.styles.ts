import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: spacing.xl,
    },
    stepIndicator: {
        marginBottom: spacing.lg,
        alignItems: 'center',
    },
    stepText: {
        color: colors.textSecondary,
        fontWeight: '500',
    },
    title: {
        paddingBottom: spacing.md,
        color: colors.primaryDark,
        fontWeight: "900",
        fontSize: 64,
        lineHeight: 56,
    },
    subtitle: {
        marginBottom: spacing.xl,
        color: colors.textSecondary,
    },
    form: {
        gap: spacing.xs,
    },
    nextButton: {
        marginBottom: 'auto',
        alignSelf: 'flex-end',
        marginLeft: 'auto',
    },
    backButton: {
        marginBottom: 'auto',
        alignSelf: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: 'auto',
    },


    imageWrapper: {
        position: 'relative',
        alignItems: 'center',
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeHint: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 9,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.primaryDark,
    },
    removeButton: {
        position: 'absolute',
        top: 14,
        right: 14,
        backgroundColor: colors.error,
        width: 28,
        height: 28,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    imageSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    placeholderContainer: {
        alignItems: 'center',
    },
    placeholder: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colors.gray[300],
        justifyContent: 'center',
        alignItems: 'center',
    },

});