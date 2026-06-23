// screens/StatsScreen.js

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  FONT,
  SPACING,
} from '../constants/colors';

import { useCategoryFilter } from '../context/CategoryFilterContext';

export default function StatsScreen({ expenses }) {
  const { selectedCategory } = useCategoryFilter();

  const filtered =
    selectedCategory === 'all'
      ? expenses
      : expenses.filter(
          (e) => e.category === selectedCategory
        );

  const total = filtered.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const count = filtered.length;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        Stats
      </Text>

      <Text style={styles.filterLabel}>
        Showing:{' '}
        {selectedCategory === 'all'
          ? 'All categories'
          : selectedCategory}
      </Text>

      <View style={styles.statCard}>
        <Text style={styles.statValue}>
          Rs. {total.toLocaleString('en-IN')}
        </Text>

        <Text style={styles.statLabel}>
          Total spent
        </Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statValue}>
          {count}
        </Text>

        <Text style={styles.statLabel}>
          Expenses
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: SPACING.lg,
  },

  title: {
    color: COLORS.text,
    fontSize: FONT.xl,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },

  filterLabel: {
    color: COLORS.textMuted,
    fontSize: FONT.md,
    marginBottom: SPACING.lg,
  },

  statCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },

  statValue: {
    color: COLORS.text,
    fontSize: FONT.display,
    fontWeight: '800',
  },

  statLabel: {
    color: COLORS.textDim,
    fontSize: FONT.sm,
    marginTop: SPACING.xs,
  },
});