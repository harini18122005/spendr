import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, RADIUS, SPACING } from "../constants/colors";

// Helper — formats a number as Indian Rupees
const formatINR = (n) =>
  "Rs. " +
  Number(n).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

export default function BudgetCard({ monthlyBudget, spent }) {
  const safeBudget = Math.max(1, Number(monthlyBudget) || 0);

  const pct = Math.min(
    100,
    Math.round((Number(spent || 0) / safeBudget) * 100)
  );

  const over = spent > safeBudget;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Monthly Budget</Text>

      <Text style={styles.amount}>
        {formatINR(monthlyBudget)}
      </Text>

      {/* Progress bar */}
      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            {
              width: `${pct}%`,
              backgroundColor: over
                ? COLORS.danger
                : COLORS.primary,
            },
          ]}
        />
      </View>

      {/* Bottom row */}
      <View style={styles.row}>
        <Text style={styles.meta}>
          Spent {formatINR(spent || 0)} ({pct}%)
        </Text>

        <Text
          style={[
            styles.meta,
            over && { color: COLORS.danger },
          ]}
        >
          {over
            ? "Over budget"
            : `${formatINR(
                Math.max(0, safeBudget - (spent || 0))
              )} left`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },

  label: {
    color: COLORS.textMuted,
    fontSize: FONT.xs,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  amount: {
    color: COLORS.text,
    fontSize: FONT.xxl,
    fontWeight: "800",
    marginTop: 2,
  },

  barBg: {
    height: 8,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 4,
    marginTop: SPACING.md,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    borderRadius: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
  },

  meta: {
    color: COLORS.textMuted,
    fontSize: FONT.sm,
  },
});